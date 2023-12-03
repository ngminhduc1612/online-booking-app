using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class add_updateHotelTable_Style : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Style",
                table: "Hotel",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Style",
                table: "Hotel");
        }
    }
}
