using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class addLikes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // If the column is an identity column, drop the identity property
            migrationBuilder.Sql(@"
                DO $$ 
                BEGIN
                    IF EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_name='Recipes' 
                        AND column_name='Id' 
                        AND is_identity='YES'
                    ) THEN
                        EXECUTE 'ALTER TABLE ""Recipes"" ALTER COLUMN ""Id"" DROP IDENTITY';
                    END IF;
                END $$;
            ");

            // Change the column type to character varying(255)
            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Recipes",
                type: "character varying(255)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            // Create the Likes table
            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "character varying(255)", nullable: false),
                    RecipeId = table.Column<string>(type: "character varying(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => new { x.UserId, x.RecipeId });
                    table.ForeignKey(
                        name: "FK_Likes_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_RecipeId",
                table: "Likes",
                column: "RecipeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop the Likes table
            migrationBuilder.DropTable(
                name: "Likes");

            // Revert the column type change
            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Recipes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);
        }
    }
}
