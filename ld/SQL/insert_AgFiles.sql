USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[sp_insert_AgFiles]    Script Date: 02/08/2013 01:00:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create   PROCEDURE [dbo].[sp_insert_AgFiles]	 
	(@ROrdNum [int],
	@AutorFileName [varchar](100),
	@RealFileName [varchar](50),
	@FileType [char](10),
	@FileSize [nchar](10),
	@FilePlase [varchar](250),
	@InsUsr  [nchar](10) )


AS
SET dateformat dmy

INSERT INTO [dbo].[AgFiles]
( 	
	[ROrdNum],
	[UploadFileTime],
	[AutorFileName],
	[RealFileName] ,
	[FileType],
	[FileSize] ,
	[FilePlase],
	[InsUsr] )
	VALUES
	(
	@ROrdNum,
	getdate(),
	@AutorFileName,
	@RealFileName,
	@FileType,
	@FileSize,
	@FilePlase,
	@InsUsr
	)
	 return @@error
GO


