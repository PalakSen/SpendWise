using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Personalexpenditure
{
    public int Exid { get; set; }

    public string Edesc { get; set; } = null!;

    public DateOnly Edate { get; set; }

    public string Tid { get; set; } = null!;

    public int? Uid { get; set; }

    public int? Pcid { get; set; }

    public virtual Personalcategory? Pc { get; set; }

    public virtual Login? UidNavigation { get; set; }
}
