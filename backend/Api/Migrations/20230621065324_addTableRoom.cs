using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class addTableRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Room",
                columns: table => new
                {
                    RoomID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<byte>(type: "tinyint", nullable: false),
                    Style = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Room", x => x.RoomID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Room");
        }
    }
}
