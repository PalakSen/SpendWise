using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Role
{
    public int Roleid { get; set; }

    public string Rname { get; set; } = null!;

    public virtual ICollection<Login> Logins { get; set; } = new List<Login>();
}
