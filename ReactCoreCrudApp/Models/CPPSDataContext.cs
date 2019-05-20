using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ReactCoreCrudApp.Models
{
    public partial class CPPSDataContext : DbContext
    {
        public CPPSDataContext()
        {
        }

        public CPPSDataContext(DbContextOptions<CPPSDataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductSold> ProductSold { get; set; }
        public virtual DbSet<Store> Store { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=VID\\SQLEXPRESS;Database=CPPSData;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Address).HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            });

            modelBuilder.Entity<ProductSold>(entity =>
            {
                entity.Property(e => e.DateSold).HasColumnType("date");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.ProductSold)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductSold_Customer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductSold)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductSold_Product1");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.ProductSold)
                    .HasForeignKey(d => d.StoreId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductSold_Store");
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.Property(e => e.Address).HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}
