using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace LoginRestApi.Models;

public partial class ProjectdbContext : DbContext
{
    public ProjectdbContext()
    {
    }

    public ProjectdbContext(DbContextOptions<ProjectdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<Login> Logins { get; set; }

    public virtual DbSet<Organizationhead> Organizationheads { get; set; }

    public virtual DbSet<Orgcategory> Orgcategories { get; set; }

    public virtual DbSet<Orgexpenditure> Orgexpenditures { get; set; }

    public virtual DbSet<Orgfund> Orgfunds { get; set; }

    public virtual DbSet<Personalbudget> Personalbudgets { get; set; }

    public virtual DbSet<Personalcategory> Personalcategories { get; set; }

    public virtual DbSet<Personalexpenditure> Personalexpenditures { get; set; }

    public virtual DbSet<Request> Requests { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=projectdb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasKey(e => e.Deptid).HasName("PRIMARY");

            entity.ToTable("department");

            entity.HasIndex(e => e.Deptname, "deptname_UNIQUE").IsUnique();

            entity.Property(e => e.Deptid).HasColumnName("deptid");
            entity.Property(e => e.Allocatedamt).HasColumnName("allocatedamt");
            entity.Property(e => e.Deptname)
                .HasMaxLength(45)
                .HasColumnName("deptname");
            entity.Property(e => e.Requestedamt).HasColumnName("requestedamt");
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("login");

            entity.HasIndex(e => e.Contact, "contact_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Email, "email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Pwd, "pwd_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Roleid, "roleid_idx");

            entity.HasIndex(e => e.Uid, "uid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Uname, "uname_UNIQUE").IsUnique();

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.City)
                .HasMaxLength(45)
                .HasColumnName("city");
            entity.Property(e => e.Contact)
                .HasMaxLength(45)
                .HasColumnName("contact");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.Fname)
                .HasMaxLength(45)
                .HasColumnName("fname");
            entity.Property(e => e.Lname)
                .HasMaxLength(45)
                .HasColumnName("lname");
            entity.Property(e => e.Pwd)
                .HasMaxLength(45)
                .HasColumnName("pwd");
            entity.Property(e => e.Roleid).HasColumnName("roleid");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Uname)
                .HasMaxLength(45)
                .HasColumnName("uname");

            entity.HasOne(d => d.Role).WithMany(p => p.Logins)
                .HasForeignKey(d => d.Roleid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("roleid");
        });

        modelBuilder.Entity<Organizationhead>(entity =>
        {
            entity.HasKey(e => e.Orgid).HasName("PRIMARY");

            entity.ToTable("organizationhead");

            entity.HasIndex(e => e.Orgname, "oname_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Uid, "orguid_idx");

            entity.HasIndex(e => e.Orgwebsite, "orgwebsite_UNIQUE").IsUnique();

            entity.Property(e => e.Orgid).HasColumnName("orgid");
            entity.Property(e => e.Industry)
                .HasMaxLength(45)
                .HasColumnName("industry");
            entity.Property(e => e.Orgaddress)
                .HasMaxLength(45)
                .HasColumnName("orgaddress");
            entity.Property(e => e.Orgdesc)
                .HasMaxLength(45)
                .HasColumnName("orgdesc");
            entity.Property(e => e.Orgname)
                .HasMaxLength(45)
                .HasColumnName("orgname");
            entity.Property(e => e.Orgwebsite)
                .HasMaxLength(45)
                .HasColumnName("orgwebsite");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Organizationheads)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("orguid");
        });

        modelBuilder.Entity<Orgcategory>(entity =>
        {
            entity.HasKey(e => e.Orgcid).HasName("PRIMARY");

            entity.ToTable("orgcategory");

            entity.HasIndex(e => e.Orgcname, "orgcname_UNIQUE").IsUnique();

            entity.Property(e => e.Orgcid).HasColumnName("orgcid");
            entity.Property(e => e.Cdesc)
                .HasMaxLength(45)
                .HasColumnName("cdesc");
            entity.Property(e => e.Orgcname)
                .HasMaxLength(45)
                .HasColumnName("orgcname");
        });

        modelBuilder.Entity<Orgexpenditure>(entity =>
        {
            entity.HasKey(e => e.Orgexid).HasName("PRIMARY");

            entity.ToTable("orgexpenditure");

            entity.HasIndex(e => e.Deptid, "dptid_idx");

            entity.HasIndex(e => e.Orgcid, "ocid_idx");

            entity.HasIndex(e => e.Transactionid, "transactionid_UNIQUE").IsUnique();

            entity.Property(e => e.Orgexid).HasColumnName("orgexid");
            entity.Property(e => e.Deptid).HasColumnName("deptid");
            entity.Property(e => e.Expamt).HasColumnName("expamt");
            entity.Property(e => e.Expdate).HasColumnName("expdate");
            entity.Property(e => e.Exppurpose)
                .HasMaxLength(45)
                .HasColumnName("exppurpose");
            entity.Property(e => e.Orgcid).HasColumnName("orgcid");
            entity.Property(e => e.Transactionid)
                .HasMaxLength(45)
                .HasColumnName("transactionid");

            entity.HasOne(d => d.Dept).WithMany(p => p.Orgexpenditures)
                .HasForeignKey(d => d.Deptid)
                .HasConstraintName("dptid");

            entity.HasOne(d => d.Orgc).WithMany(p => p.Orgexpenditures)
                .HasForeignKey(d => d.Orgcid)
                .HasConstraintName("ocid");
        });

        modelBuilder.Entity<Orgfund>(entity =>
        {
            entity.HasKey(e => e.Fundid).HasName("PRIMARY");

            entity.ToTable("orgfunds");

            entity.HasIndex(e => e.Deptid, "dpt_id_idx");

            entity.Property(e => e.Fundid).HasColumnName("fundid");
            entity.Property(e => e.Deptid).HasColumnName("deptid");
            entity.Property(e => e.Fenddate).HasColumnName("fenddate");
            entity.Property(e => e.Fstartdate).HasColumnName("fstartdate");
            entity.Property(e => e.Fundamt).HasColumnName("fundamt");

            entity.HasOne(d => d.Dept).WithMany(p => p.Orgfunds)
                .HasForeignKey(d => d.Deptid)
                .HasConstraintName("dpt_id");
        });

        modelBuilder.Entity<Personalbudget>(entity =>
        {
            entity.HasKey(e => e.Bid).HasName("PRIMARY");

            entity.ToTable("personalbudget");

            entity.HasIndex(e => e.Pcid, "pcid_idx");

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.Bid).HasColumnName("bid");
            entity.Property(e => e.Bamount).HasColumnName("bamount");
            entity.Property(e => e.Enddate).HasColumnName("enddate");
            entity.Property(e => e.Pcid).HasColumnName("pcid");
            entity.Property(e => e.Startdate).HasColumnName("startdate");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.Pc).WithMany(p => p.Personalbudgets)
                .HasForeignKey(d => d.Pcid)
                .HasConstraintName("pcid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Personalbudgets)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("uid");
        });

        modelBuilder.Entity<Personalcategory>(entity =>
        {
            entity.HasKey(e => e.Pcid).HasName("PRIMARY");

            entity.ToTable("personalcategory");

            entity.HasIndex(e => e.Cname, "cname_UNIQUE").IsUnique();

            entity.Property(e => e.Pcid).HasColumnName("pcid");
            entity.Property(e => e.Cname)
                .HasMaxLength(45)
                .HasColumnName("cname");
            entity.Property(e => e.Desc)
                .HasMaxLength(45)
                .HasColumnName("desc");
        });

        modelBuilder.Entity<Personalexpenditure>(entity =>
        {
            entity.HasKey(e => e.Exid).HasName("PRIMARY");

            entity.ToTable("personalexpenditure");

            entity.HasIndex(e => e.Pcid, "expcid_idx");

            entity.HasIndex(e => e.Tid, "tid_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Uid, "uid_idx");

            entity.Property(e => e.Exid).HasColumnName("exid");
            entity.Property(e => e.Edate).HasColumnName("edate");
            entity.Property(e => e.Edesc)
                .HasMaxLength(45)
                .HasColumnName("edesc");
            entity.Property(e => e.Pcid).HasColumnName("pcid");
            entity.Property(e => e.Tid)
                .HasMaxLength(45)
                .HasColumnName("tid");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.Pc).WithMany(p => p.Personalexpenditures)
                .HasForeignKey(d => d.Pcid)
                .HasConstraintName("expcid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Personalexpenditures)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("exuid");
        });

        modelBuilder.Entity<Request>(entity =>
        {
            entity.HasKey(e => e.Reqid).HasName("PRIMARY");

            entity.ToTable("requests");

            entity.HasIndex(e => e.Deptid, "dt_id_idx");

            entity.Property(e => e.Reqid).HasColumnName("reqid");
            entity.Property(e => e.Deptid).HasColumnName("deptid");
            entity.Property(e => e.Reqamt).HasColumnName("reqamt");
            entity.Property(e => e.Reqdate).HasColumnName("reqdate");
            entity.Property(e => e.Reqdesc)
                .HasMaxLength(45)
                .HasColumnName("reqdesc");
            entity.Property(e => e.Reqstatus).HasColumnName("reqstatus");

            entity.HasOne(d => d.Dept).WithMany(p => p.Requests)
                .HasForeignKey(d => d.Deptid)
                .HasConstraintName("dt_id");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Roleid).HasName("PRIMARY");

            entity.ToTable("role");

            entity.HasIndex(e => e.Rname, "rname_UNIQUE").IsUnique();

            entity.Property(e => e.Roleid).HasColumnName("roleid");
            entity.Property(e => e.Rname)
                .HasMaxLength(30)
                .HasColumnName("rname");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
