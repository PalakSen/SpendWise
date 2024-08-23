using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Department
{
    public int Deptid { get; set; }

    public string Deptname { get; set; } = null!;

    public double Allocatedamt { get; set; }

    public double Requestedamt { get; set; }

    public virtual ICollection<Orgexpenditure> Orgexpenditures { get; set; } = new List<Orgexpenditure>();

    public virtual ICollection<Orgfund> Orgfunds { get; set; } = new List<Orgfund>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
