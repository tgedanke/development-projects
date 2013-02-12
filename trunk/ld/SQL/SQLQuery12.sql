USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[sp_select_AgFiles]    Script Date: 02/05/2013 00:03:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



--exec [dbo].sp_insert_AgFiles '7777','1.jpg','11.jpg','jpg','111','tmp',0

ALTER   PROCEDURE [dbo].[sp_select_AgFiles]	 
	@ROrdNum [int],	@RealFileName [varchar](50)
AS
SET dateformat dmy
select top 1	[ROrdNum],
	[UploadFileTime]= CONVERT(varchar(20),[UploadFileTime],104)+' '+CONVERT(varchar(20),[UploadFileTime],108),
	[AutorFilleName],
	[RealFileName] ,
	[FileType] as FType,
	[FileSize] as FSize ,
	[FilePlase],
	[InsUsr],
	[IsDelete] 
	from [dbo].[AgFiles]
	where ([ROrdNum] like ROrdNum and [IsDelete] = 0)
	
	or [RealFileName] like '%'+@RealFileName+'%'
order by [UploadFileTime] desc

GO


