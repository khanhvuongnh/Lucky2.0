USE [Lucky2.0]
GO
/****** Object:  Table [dbo].[Config]    Script Date: 02/06/2021 15:12:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Config](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[WatingTime] [int] NULL,
	[Background] [nvarchar](255) NULL,
 CONSTRAINT [PK_Config] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Emp]    Script Date: 02/06/2021 15:12:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Emp](
	[EmpID] [int] IDENTITY(1,1) NOT NULL,
	[EmpCode] [nvarchar](10) NULL,
	[EmpName] [nvarchar](255) NULL,
	[EmpDept] [nvarchar](50) NULL,
 CONSTRAINT [PK_Emp] PRIMARY KEY CLUSTERED 
(
	[EmpID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Prize]    Script Date: 02/06/2021 15:12:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prize](
	[PrizeID] [int] IDENTITY(1,1) NOT NULL,
	[PrizeName] [nvarchar](255) NULL,
	[Qty] [int] NULL,
	[SpinTime] [int] NULL,
	[Image] [nvarchar](255) NULL,
	[Visible] [bit] NULL,
	[Seq] [int] NULL,
 CONSTRAINT [PK_Prize] PRIMARY KEY CLUSTERED 
(
	[PrizeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Record]    Script Date: 02/06/2021 15:12:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Record](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PrizeID] [int] NULL,
	[EmpID] [nvarchar](10) NULL,
	[Visible] [bit] NULL,
 CONSTRAINT [PK_Record] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Config] ON 

INSERT [dbo].[Config] ([ID], [WatingTime], [Background]) VALUES (1, NULL, N'images\main-bg.jpg')
SET IDENTITY_INSERT [dbo].[Config] OFF
SET IDENTITY_INSERT [dbo].[Prize] ON 

INSERT [dbo].[Prize] ([PrizeID], [PrizeName], [Qty], [SpinTime], [Image], [Visible], [Seq]) VALUES (24, N'GIẢI NHẤT - 第一名獎', 1, 1, N'59eebfd7-87d1-4230-b322-f5444fd4caed.jpg', 1, 2)
INSERT [dbo].[Prize] ([PrizeID], [PrizeName], [Qty], [SpinTime], [Image], [Visible], [Seq]) VALUES (25, N'GIẢI ĐẶC BIỆT - 特殊獎', 1, 1, N'2c6bc026-943c-433f-8e92-cde4a9c57960.jpg', 1, 1)
INSERT [dbo].[Prize] ([PrizeID], [PrizeName], [Qty], [SpinTime], [Image], [Visible], [Seq]) VALUES (26, N'GIẢI NHÌ - 第二名獎', 8, 4, N'8a401e35-ffca-4b86-b132-ef2d66a2df42.jpg', 1, 3)
INSERT [dbo].[Prize] ([PrizeID], [PrizeName], [Qty], [SpinTime], [Image], [Visible], [Seq]) VALUES (27, N'GIẢI BA - 第三名獎', 10, 5, N'251bdaf3-c87b-45e6-8dbf-bd2957d1100e.jpg', 1, 4)
INSERT [dbo].[Prize] ([PrizeID], [PrizeName], [Qty], [SpinTime], [Image], [Visible], [Seq]) VALUES (28, N'GIẢI KHUYẾN KHÍCH 1 - 精神獎 1', 50, 5, N'2f42cf0c-91fa-4c1e-a2d2-337e53567851.jpg', 1, 5)
INSERT [dbo].[Prize] ([PrizeID], [PrizeName], [Qty], [SpinTime], [Image], [Visible], [Seq]) VALUES (29, N'GIẢI KHUYẾN KHÍCH 2 - 精神獎 2', 50, 5, N'7065efe8-1f64-4da0-afd1-92e9203a0af5.jpg', 1, 6)
INSERT [dbo].[Prize] ([PrizeID], [PrizeName], [Qty], [SpinTime], [Image], [Visible], [Seq]) VALUES (30, N'QUAY BỔ SUNG 1 - 副獎 1', 1, 1, N'', 1, 7)
INSERT [dbo].[Prize] ([PrizeID], [PrizeName], [Qty], [SpinTime], [Image], [Visible], [Seq]) VALUES (31, N'QUAY BỔ SUNG 2 - 副獎 2', 2, 1, N'', 1, 8)
INSERT [dbo].[Prize] ([PrizeID], [PrizeName], [Qty], [SpinTime], [Image], [Visible], [Seq]) VALUES (32, N'QUAY BỔ SUNG 5 - 副獎 5', 5, 1, N'', 1, 9)
SET IDENTITY_INSERT [dbo].[Prize] OFF
