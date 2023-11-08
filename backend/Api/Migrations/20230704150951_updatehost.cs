using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class updatehost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LinkImg",
                table: "Room");

            migrationBuilder.AddColumn<Guid>(
                name: "HostId",
                table: "Hotel",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Hosts",
                columns: table => new
                {
                    HostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hosts", x => x.HostId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hotel_HostId",
                table: "Hotel",
                column: "HostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hotel_Host",
                table: "Hotel",
                column: "HostId",
                principalTable: "Hosts",
                principalColumn: "HostId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hotel_Host",
                table: "Hotel");

            migrationBuilder.DropTable(
                name: "Hosts");

            migrationBuilder.DropIndex(
                name: "IX_Hotel_HostId",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "HostId",
                table: "Hotel");

            migrationBuilder.AddColumn<string>(
                name: "LinkImg",
                table: "Room",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
