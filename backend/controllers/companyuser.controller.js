import CompanyUser from "../models/companyuser.model.js";

export const getCompanyNameById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await CompanyUser.findById(companyId).select('companyName'); // Only fetch 'name'

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json({ companyName: company.companyName });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};