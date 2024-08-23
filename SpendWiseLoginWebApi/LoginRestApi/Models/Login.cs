using System;
using System.Collections.Generic;

namespace LoginRestApi.Models;

public partial class Login
{
    public int Uid { get; set; }

    public string Uname { get; set; } = null!;

    public string Pwd { get; set; } = null!;

    public string Email { get; set; } = null!;

    public sbyte Status { get; set; }

    public int Roleid { get; set; }

    public string Fname { get; set; } = null!;

    public string Lname { get; set; } = null!;

    public string Contact { get; set; } = null!;

    public string? City { get; set; }

    public virtual ICollection<Organizationhead> Organizationheads { get; set; } = new List<Organizationhead>();

    public virtual ICollection<Personalbudget> Personalbudgets { get; set; } = new List<Personalbudget>();

    public virtual ICollection<Personalexpenditure> Personalexpenditures { get; set; } = new List<Personalexpenditure>();

    public virtual Role? Role { get; set; } = null!;
}
