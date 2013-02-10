create PROCEDURE [dbo].[sp_delete_AgFiles]
(
--declare
@ROrdNum [int],
@InsUsr  [nchar](10),
@RealFileName [varchar](50)
 )
--select @ROrdNum ='7777', @InsUsr='webuser',  @RealFileName=''
as
declare 
@id int,
 @RealDelName [varchar](50) ,
 @AutorDelName [varchar](100),
 @FilePlase [varchar](250)

select top 1 @id =[FileID],@RealDelName=[RealFileName],@AutorDelName=[AutorFileName],@FilePlase = [FilePlase]
from [dbo].[AgFiles]
where
([ROrdNum] like '%'+LTRIM(RTRIM(@ROrdNum))+'%'
and
[InsUsr] like '%'+LTRIM(RTRIM(@InsUsr))+'%') 
or
[RealFileName] like '%'+LTRIM(RTRIM(@RealFileName))+'%'	
order by [UploadFileTime]

delete from [dbo].[AgFiles]
where
@id =[FileID]
	
select 
 @RealDelName as RealDelName,
 @AutorDelName as AutorDelName,
 @FilePlase as FilePlase

	 
GO 