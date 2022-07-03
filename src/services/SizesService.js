import { supabase } from './utils/supabaseClient';

class SizesService {
  async getSizes() {
    const { data, error } = await supabase
      .from('sizes')
      .select('*');

    if (error) throw error;

    return data;
  }

  async createSize(size) {
    const { data, error } = await supabase
      .from('sizes')
      .insert(size);

    if (error) throw error;

    return data;
  }
}

export default new SizesService();
