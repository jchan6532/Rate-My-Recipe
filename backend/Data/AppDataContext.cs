using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDataContext : DbContext
    {
        protected override void OnConfiguring() {

        }
    }
}