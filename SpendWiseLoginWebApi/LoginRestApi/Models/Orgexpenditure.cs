using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Orgexpenditure
{
    public int Orgexid { get; set; }

    public double Expamt { get; set; }

    public string Exppurpose { get; set; } = null!;

    public DateOnly Expdate { get; set; }

    public string Transactionid { get; set; } = null!;

    public int? Orgcid { get; set; }

    public int? Deptid { get; set; }

    public virtual Department? Dept { get; set; }

    public virtual Orgcategory? Orgc { get; set; }
}
