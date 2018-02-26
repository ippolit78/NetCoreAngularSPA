namespace CoreAngularApp.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using System.IO;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using System.Text.RegularExpressions;
    using Microsoft.Net.Http.Headers;
    using DocumentFormat.OpenXml;
    using DocumentFormat.OpenXml.Packaging;
    using DocumentFormat.OpenXml.Spreadsheet;
    using OfficeOpenXml;
    using System.Linq;
    using System.Text;
    using System.Data;
    using System.Collections.Generic;
    using Newtonsoft.Json.Converters;

    [Route("api/upload")]
    public class UploadController : Controller
    {
        IHostingEnvironment _appEnvironment;
        string pathToFile;
        string fileStrId;

        List<KeyValuePair<string, string>> xlsxDataListRow = new List<KeyValuePair<string, string>>();

        List<KeyValuePair<string, string>> copyOfxlsxDataListRow = new List<KeyValuePair<string, string>>();

        List<KeyValuePair<string, int>> resultList = new List<KeyValuePair<string, int>>();

        public UploadController(IHostingEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
        }

        [HttpPost]
        public JsonResult Post([FromForm]IFormFile upload)
        {
            fileStrId = upload.FileName;

            if (upload != null)
            {
                DateTime localDate = DateTime.Now;
                var LocalDateStr = localDate.ToString();
                string regPattern1 = @"[^0-9+]";
                string replacementString = "";
                string dateTime = Regex.Replace(LocalDateStr, regPattern1, replacementString);

                string path = "/Files/" + dateTime + "_" + fileStrId;

                using (var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create))
                {
                    upload.CopyToAsync(fileStream);
                    pathToFile = fileStream.Name;
                }

                var existingFile = new FileInfo(pathToFile);

                using (var package = new ExcelPackage(existingFile))
                {
                    var workBook = package.Workbook;

                    if (workBook != null)
                    {
                        if (workBook.Worksheets.Count > 0)
                        {
                            // Get the first worksheet
                            var currentWorksheet = workBook.Worksheets.First();

                            var rowCount = currentWorksheet.Dimension.End.Row;
                            var colCount = currentWorksheet.Dimension.End.Column;
                            for (var i = 2; i <= rowCount; i++)
                            {
                                if (currentWorksheet.Cells[i, 1].Value != null)
                                {
                                    DateTime dataNew = DateTime.FromOADate(currentWorksheet.Cells[i, 1].GetValue<double>());
                                    string dateOfWork = dataNew.GetDateTimeFormats('d')[0];

                                    string operatortVal = currentWorksheet.Cells[i, 4].Value?.ToString();

                                    Dictionary<string, string> dictionaryRowEntity = new Dictionary<string, string>()
                                    {
                                        {dateOfWork, operatortVal}
                                    };

                                    foreach (KeyValuePair<string, string> rowItem in dictionaryRowEntity)
                                    {
                                        xlsxDataListRow.Add(rowItem);
                                    }
                                }

                                else
                                {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                return Json("ERROR!!!!!!");
            }
            
            var distinctGroup = xlsxDataListRow
                .GroupBy(v => v.Key)
                .Where(g => g.Any())
                .ToDictionary(x => x.Key, y => y.Distinct().Count());

            foreach (var group in distinctGroup)
            {
                resultList.Add(group);
            }

            var output = Newtonsoft.Json.JsonConvert.SerializeObject(resultList);

            return Json(output);
        }
    }
}
