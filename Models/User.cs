using System;
using System.Collections.Generic;

namespace FYP.Models;

public partial class User
{
    public int UserId { get; set; }

    public int ClientId { get; set; }

    public int RoleId { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? LastLogin { get; set; }

    public virtual Client Client { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;
}
