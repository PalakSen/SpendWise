using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Organizationhead
{
    public int Orgid { get; set; }

    public string Orgname { get; set; } = null!;

    public string Orgaddress { get; set; } = null!;

    public string Industry { get; set; } = null!;

    public string? Orgwebsite { get; set; }

    public string? Orgdesc { get; set; }

    public int? Uid { get; set; }

    public virtual Login? UidNavigation { get; set; }
}
