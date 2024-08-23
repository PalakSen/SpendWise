using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Personalbudget
{
    public int Bid { get; set; }

    public int? Uid { get; set; }

    public int? Pcid { get; set; }

    public float Bamount { get; set; }

    public DateOnly Startdate { get; set; }

    public DateOnly Enddate { get; set; }

    public virtual Personalcategory? Pc { get; set; }

    public virtual Login? UidNavigation { get; set; }
}
