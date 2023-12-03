using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class addTblBooking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Booking",
                columns: table => new
                {
                    BookingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    status = table.Column<byte>(type: "tinyint", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalCost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booking", x => x.BookingId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Booking");
        }
    }
}
