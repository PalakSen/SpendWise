using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Orgcategory
{
    public int Orgcid { get; set; }

    public string Orgcname { get; set; } = null!;

    public string Cdesc { get; set; } = null!;

    public virtual ICollection<Orgexpenditure> Orgexpenditures { get; set; } = new List<Orgexpenditure>();
}
