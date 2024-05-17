using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class createdcommentmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "createdAt",
                table: "Users",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "createdAt",
                table: "Recipes",
                newName: "CreatedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Users",
                newName: "createdAt");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Recipes",
                newName: "createdAt");
        }
    }
}
