namespace HackathonDashboard.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Cascadeondeletesetfalse : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Comments", "PostId", "dbo.Posts");
            DropForeignKey("dbo.Milestones", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.Members", "TeamId", "dbo.Teams");
            DropIndex("dbo.Comments", new[] { "PostId" });
            DropIndex("dbo.Milestones", new[] { "TeamId" });
            DropIndex("dbo.Members", new[] { "TeamId" });
            CreateIndex("dbo.Comments", "PostId");
            CreateIndex("dbo.Milestones", "TeamId");
            CreateIndex("dbo.Members", "TeamId");
            AddForeignKey("dbo.Comments", "PostId", "dbo.Posts", "PostId");
            AddForeignKey("dbo.Milestones", "TeamId", "dbo.Teams", "TeamId");
            AddForeignKey("dbo.Members", "TeamId", "dbo.Teams", "TeamId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Members", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.Milestones", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.Comments", "PostId", "dbo.Posts");
            DropIndex("dbo.Members", new[] { "TeamId" });
            DropIndex("dbo.Milestones", new[] { "TeamId" });
            DropIndex("dbo.Comments", new[] { "PostId" });
            CreateIndex("dbo.Members", "TeamId");
            CreateIndex("dbo.Milestones", "TeamId");
            CreateIndex("dbo.Comments", "PostId");
            AddForeignKey("dbo.Members", "TeamId", "dbo.Teams", "TeamId", cascadeDelete: true);
            AddForeignKey("dbo.Milestones", "TeamId", "dbo.Teams", "TeamId", cascadeDelete: true);
            AddForeignKey("dbo.Comments", "PostId", "dbo.Posts", "PostId", cascadeDelete: true);
        }
    }
}
