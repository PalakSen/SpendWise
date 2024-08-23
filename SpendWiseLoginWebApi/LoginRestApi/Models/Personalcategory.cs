using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Personalcategory
{
    public int Pcid { get; set; }

    public string Cname { get; set; } = null!;

    public string Desc { get; set; } = null!;

    public virtual ICollection<Personalbudget> Personalbudgets { get; set; } = new List<Personalbudget>();

    public virtual ICollection<Personalexpenditure> Personalexpenditures { get; set; } = new List<Personalexpenditure>();
}
