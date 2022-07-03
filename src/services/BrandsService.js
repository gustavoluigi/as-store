import { supabase } from './utils/supabaseClient';

class BrandsService {
  async getBrands() {
    const { data, error } = await supabase
      .from('brands')
      .select('*');

    if (error) throw error;

    return data;
  }

  async createBrand(brand) {
    const { data, error } = await supabase
      .from('brands')
      .insert(brand);

    if (error) throw error;

    return data;
  }
}

export default new BrandsService();
