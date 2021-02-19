namespace lucky_api.Dtos
{
    public class RecordDto
    {
        public int ID { get; set; }
        public int? PrizeID { get; set; }
        public string EmpCode { get; set; }
        public bool? Visible { get; set; }
        public string EmpName { get; set; }
        public string EmpDept { get; set; }
    }
}