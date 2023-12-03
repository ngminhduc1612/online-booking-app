using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class changeUserTable_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "User",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(25)",
                oldMaxLength: 25);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "User",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(25)",
                oldMaxLength: 25);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "User",
                type: "nvarchar(25)",
                maxLength: 25,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "User",
                type: "nvarchar(25)",
                maxLength: 25,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldMaxLength: 250);
        }
    }
}
