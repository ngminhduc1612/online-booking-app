using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class addInfrasTb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Room",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LinkImg",
                table: "Room",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Infras",
                columns: table => new
                {
                    InfrasId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NameItem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<byte>(type: "tinyint", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Infras", x => x.InfrasId);
                });

            migrationBuilder.CreateTable(
                name: "Room_Infras",
                columns: table => new
                {
                    InfrasId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Room_Infras", x => new { x.RoomID, x.InfrasId });
                    table.ForeignKey(
                        name: "FK_Room_Infras_Infras",
                        column: x => x.InfrasId,
                        principalTable: "Infras",
                        principalColumn: "InfrasId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Room_Infras_Room",
                        column: x => x.RoomID,
                        principalTable: "Room",
                        principalColumn: "RoomID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Room_Infras_InfrasId",
                table: "Room_Infras",
                column: "InfrasId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Room_Infras");

            migrationBuilder.DropTable(
                name: "Infras");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "LinkImg",
                table: "Room");
        }
    }
}
