using Microsoft.EntityFrameworkCore;

namespace Api.Database
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions options) : base(options) { }

        #region DbSet
        public DbSet<Host> Hosts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingDetail> BookingDetails { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Infras> Infrases { get; set; }
        public DbSet<Room_Infras> Room_Infrases { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Hotel>(e =>
            {
                e.ToTable("Hotel");
                e.HasKey(h => h.HotelID);
                e.HasOne(e => e.Host)
                .WithMany(e => e.Hotels)
                .HasForeignKey(e => e.HostId)
                .HasConstraintName("FK_Hotel_Host");
            });

            modelBuilder.Entity<Room>(e => {
                e.ToTable("Room");
                e.HasKey(r => r.RoomID);
                e.HasOne(e => e.Hotels)
                .WithMany(e => e.Rooms)
                .HasForeignKey(e => e.HotelID)
                .HasConstraintName("FK_Hotel_Room");
            });

            modelBuilder.Entity<UserDetail>(e => {
                e.ToTable("UserDetail");
                e.HasKey(u => u.Id);
                e.HasOne(e => e.User)
                 .WithMany(e => e.UserDetails)
                 .HasForeignKey(e => e.Id)
                 .HasConstraintName("FK_UserDetail_User");       
            });

            modelBuilder.Entity<User>(e =>
            {
                e.HasIndex(e => e.Username).IsUnique();
            });

            modelBuilder.Entity<BookingDetail>(e => {
                e.ToTable("BookingDetail");
                e.HasKey(e => new {e.RoomID, e.BookingId, e.Id});
                e.HasOne(e => e.Room)
                    .WithMany(e => e.BookingDetails)
                    .HasForeignKey(e => e.RoomID)
                    .HasConstraintName("FK_BookingDetail_Room");

                e.HasOne(e => e.Booking)
                    .WithMany(e => e.BookingDetails)
                    .HasForeignKey(e => e.BookingId)
                    .HasConstraintName("FK_BookingDetail_Booking");

                e.HasOne(e => e.User)
                    .WithMany(e => e.BookingDetails)
                    .HasForeignKey(e => e.Id)
                    .HasConstraintName("FK_BookingDetail_User");
            });

            modelBuilder.Entity<Room_Infras>(e =>
            {
                e.ToTable("Room_Infras");
                e.HasKey(e => new {e.RoomID, e.InfrasId });
                e.HasOne (e => e.Room)
                 .WithMany(e => e.Room_Infras)
                 .HasForeignKey (e => e.RoomID)
                 .HasConstraintName("FK_Room_Infras_Room");

                e.HasOne(e => e.Infras)
                 .WithMany(e => e.Room_Infras)
                 .HasForeignKey(e => e.InfrasId)
                 .HasConstraintName("FK_Room_Infras_Infras");
            });
        }
    }
}
