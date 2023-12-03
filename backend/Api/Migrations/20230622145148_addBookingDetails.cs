using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class addBookingDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookingDetail",
                columns: table => new
                {
                    BookingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Start = table.Column<DateTime>(type: "datetime2", nullable: false),
                    End = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NumPeple = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingDetail", x => new { x.RoomID, x.BookingId, x.Id });
                    table.ForeignKey(
                        name: "FK_BookingDetail_Booking",
                        column: x => x.BookingId,
                        principalTable: "Booking",
                        principalColumn: "BookingId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookingDetail_Room",
                        column: x => x.RoomID,
                        principalTable: "Room",
                        principalColumn: "RoomID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookingDetail_User",
                        column: x => x.Id,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookingDetail_BookingId",
                table: "BookingDetail",
                column: "BookingId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingDetail_Id",
                table: "BookingDetail",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookingDetail");
        }
    }
}
