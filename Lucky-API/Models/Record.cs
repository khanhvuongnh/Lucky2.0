﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lucky_api.Models
{
    public partial class Record
    {
        [Key]
        public int ID { get; set; }
        public int? PrizeID { get; set; }
        [StringLength(10)]
        public string EmpCode { get; set; }
        public bool? Visible { get; set; }
    }
}