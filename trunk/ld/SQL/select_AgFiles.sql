USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[sp_select_AgFiles]    Script Date: 02/08/2013 01:00:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




--exec [dbo].sp_insert_AgFiles '7777','1.jpg','11.jpg','jpg','111','tmp'

create   PROCEDURE [dbo].[sp_select_AgFiles]	 
	@ROrdNum [int]
AS
SET dateformat dmy
select top 1	[ROrdNum],
	[UploadFileTime]= CONVERT(varchar(20),[UploadFileTime],104)+' '+CONVERT(varchar(20),[UploadFileTime],108),
	[AutorFileName],
	[RealFileName] ,
	[FileType] as FType,
	[FileSize] as FSize ,
	[FilePlase],
	[InsUsr] 
	from [dbo].[AgFiles]
	where ([ROrdNum] like ROrdNum )
order by [UploadFileTime]desc

return @@error

GO


