using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Orgfund
{
    public int Fundid { get; set; }

    public double Fundamt { get; set; }

    public int? Deptid { get; set; }

    public DateOnly Fstartdate { get; set; }

    public DateOnly Fenddate { get; set; }

    public virtual Department? Dept { get; set; }
}
