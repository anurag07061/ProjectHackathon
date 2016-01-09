namespace HackathonDashboard.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DatabaseInitialization : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentId = c.Int(nullable: false, identity: true),
                        PostId = c.Int(nullable: false),
                        CommentOwner = c.String(),
                        CommentDescription = c.String(),
                    })
                .PrimaryKey(t => t.CommentId)
                .ForeignKey("dbo.Posts", t => t.PostId, cascadeDelete: true)
                .Index(t => t.PostId);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        PostId = c.Int(nullable: false, identity: true),
                        PostOwner = c.String(),
                        Status = c.String(),
                        FileName = c.String(),
                        ContentType = c.String(),
                        FileUrl = c.String(),
                        Content = c.Binary(),
                        DateCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.PostId);
            
            CreateTable(
                "dbo.Members",
                c => new
                    {
                        MemberId = c.String(nullable: false, maxLength: 128),
                        MemberName = c.String(),
                        MemberEmail = c.String(),
                        TeamId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.MemberId)
                .ForeignKey("dbo.Teams", t => t.TeamId, cascadeDelete: true)
                .Index(t => t.TeamId);
            
            CreateTable(
                "dbo.Teams",
                c => new
                    {
                        TeamId = c.String(nullable: false, maxLength: 128),
                        TeamName = c.String(nullable: false),
                        TeamLeaderName = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.TeamId);
            
            CreateTable(
                "dbo.Milestones",
                c => new
                    {
                        MilestoneId = c.Int(nullable: false, identity: true),
                        TeamId = c.String(nullable: false, maxLength: 128),
                        MilestoneDescription = c.String(),
                        Status = c.String(),
                    })
                .PrimaryKey(t => t.MilestoneId)
                .ForeignKey("dbo.Teams", t => t.TeamId, cascadeDelete: true)
                .Index(t => t.TeamId);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        TeamId = c.String(nullable: false, maxLength: 128),
                        ProjectDescription = c.String(),
                        TechnologyStack = c.String(),
                    })
                .PrimaryKey(t => t.TeamId)
                .ForeignKey("dbo.Teams", t => t.TeamId)
                .Index(t => t.TeamId);
            
            CreateTable(
                "dbo.PostLikeDislikes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PostId = c.Int(nullable: false),
                        MemberId = c.String(),
                        NoOfLikes = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Members", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.Projects", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.Milestones", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.Comments", "PostId", "dbo.Posts");
            DropIndex("dbo.Members", new[] { "TeamId" });
            DropIndex("dbo.Projects", new[] { "TeamId" });
            DropIndex("dbo.Milestones", new[] { "TeamId" });
            DropIndex("dbo.Comments", new[] { "PostId" });
            DropTable("dbo.PostLikeDislikes");
            DropTable("dbo.Projects");
            DropTable("dbo.Milestones");
            DropTable("dbo.Teams");
            DropTable("dbo.Members");
            DropTable("dbo.Posts");
            DropTable("dbo.Comments");
        }
    }
}
