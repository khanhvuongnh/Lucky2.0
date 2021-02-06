﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using lucky_api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace lucky_api.Data
{
    public partial class DBContext : DbContext
    {
        public virtual DbSet<Config> Config { get; set; }
        public virtual DbSet<Emp> Emp { get; set; }
        public virtual DbSet<Prize> Prize { get; set; }
        public virtual DbSet<Record> Record { get; set; }

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}