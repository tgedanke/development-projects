USE [ALERT_F]
GO

/****** Object:  Table [dbo].[AgFiles]    Script Date: 02/03/2013 02:13:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[AgFiles](
	[FileID] [int] IDENTITY(1,1) NOT NULL,
	[ROrdNum] [int] NOT NULL,
	[UploadFileTime] [datetime] NOT NULL,
	[AutorFilleName] [varchar](100) NULL,
	[RealFileName] [varchar](50) NOT NULL,
	[FileType] [char](10) NULL,
	[FileSize] [nchar](10) NULL,
	[FilePlase] [varchar](250) NOT NULL,
	[InsUsr][nchar](10) NULL,
	[IsDelete] [tinyint] NOT NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


