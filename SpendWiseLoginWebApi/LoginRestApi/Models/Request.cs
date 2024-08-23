using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Request
{
    public int Reqid { get; set; }

    public double Reqamt { get; set; }

    public DateOnly Reqdate { get; set; }

    public string Reqdesc { get; set; } = null!;

    public int? Deptid { get; set; }

    public int Reqstatus { get; set; }

    public virtual Department? Dept { get; set; }
}
