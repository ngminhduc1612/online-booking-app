using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class add_updateHotelTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Hotel",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Hotel",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HotelRule",
                table: "Hotel",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "HotelRule",
                table: "Hotel");
        }
    }
}
