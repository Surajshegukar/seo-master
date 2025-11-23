const prisma = require("../../config/prisma"); 

const getAllAuthers = async (req, res) => {
  try {
    const authers = await prisma.auther.findMany({
      where: { is_deleted: 0 },
      orderBy: { id: "desc" },
      include: {
    Magazine: {
      include: {
        category: true, 
      },
    }
  }
    });

    return res.status(200).json({
      success: true,
      message: "Authers fetched successfully",
      data: authers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err.message,
    });
  }
};

const addAuther = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      short_description,
      description,
      job,
      city,
    } = req.body;
    const image = req.file;

    const data = await prisma.auther.create({
      data: {
        full_name,
        email,
        password,
        image: image ? image.filename : null,
        short_description,
        description,
        job,
        city,
      },
    });

    res.status(201).json({
      success: true,
      message: "Auther added successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

const getAutherById = async (req, res) => {
  const { id } = req.params;

  try {
    const auther = await prisma.auther.findFirst({
      where: { id: Number(id), is_deleted: 0 },
    });

    if (!auther) {
      return res.status(404).json({
        success: false,
        message: "Auther not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Auther fetched successfully",
      data: auther,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

const updateAuther = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      full_name,
      email,
      password,
      short_description,
      description,
      job,
      city,
    } = req.body;
    const image = req.file;

    const existing = await prisma.auther.findFirst({
      where: {
        full_name,
        is_deleted: 0,
        NOT: { id: Number(id) },
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Auther already exists",
        data: {},
      });
    }

    const updated = await prisma.auther.update({
      where: { id: Number(id) },
      data: {
        full_name,
        email,
        password,
        short_description,
        description,
        job,
        city,
        ...(image && { image: image.filename }),
      },
    });

    res.status(200).json({
      success: true,
      message: "Auther updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating auther",
      data: error.message,
    });
  }
};

const uniqueAuther = async (req, res) => {
  const { full_name, currentId } = req.query;

  try {
 const whereClause = { full_name, is_deleted: 0 };
    if (currentId) {
      whereClause.NOT = { id: Number(currentId) };
    }
    const existing = await prisma.auther.findFirst({
      where: whereClause,
    });
    
    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Auther already exists",
        isUnique: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Auther name is unique",
      isUnique: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

const getAjaxAuthers = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";
  const filteredCategory = req.query?.category_id || "all";

  // Columns for sorting (add or adjust fields as needed)
  const columns = [
    "full_name",
    "image",
    "email",
    "password",
    "short_description",
    "job",
    "city",
  ];
  const colIndex = order[0]?.column;
  const dir = order[0]?.dir === "asc" ? "asc" : "desc";
  const sortField = colIndex !== undefined ? columns[colIndex] || "id" : "id";

  // Base where clause
  let whereClause = { is_deleted: 0 };

  if (searchValue) {
    whereClause = {
      ...whereClause,
      full_name: { contains: searchValue, mode: "insensitive" },
    };
  }

  if (filteredCategory !== "all") {
    whereClause.category_id = filteredCategory;
  }

  try {
    const total = await prisma.auther.count({
      where: { is_deleted: 0 },
    });

    const filtered = await prisma.auther.count({
      where: whereClause,
    });

    const docs = await prisma.auther.findMany({
      where: whereClause,
      orderBy: { [sortField]: dir },
      skip: start,
      take: length,
    });

    const data = docs.map((row, i) => [
      i + 1 + start,
      row.id,
      row.status,
      row.full_name,
      row.email,
      row.password,
      row.job,
      row.city,
      row.image,
      row.short_description,
    ]);

    res.json({
      draw,
      recordsTotal: total,
      recordsFiltered: filtered,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching authers",
      data: error.message,
    });
  }
};

module.exports = {
  getAllAuthers,
  addAuther,
  getAutherById,
  updateAuther,
  uniqueAuther,
  getAjaxAuthers,
};
