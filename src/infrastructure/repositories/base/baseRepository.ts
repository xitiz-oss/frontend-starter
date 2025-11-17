/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/lib/clients/apiClient';

export class BaseRepository<TCreate, TUpdate> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(
    isActive?: boolean,
    PageNumber: number = 1,
    PageSize: number = 10,
    search?: string,
    orderBys?: string
  ) {
    // Build params dynamically
    const params: Record<string, any> = {
      isActive,
      PageNumber,
      PageSize,
    };

    if (search && search.trim() !== '') params.search = search.trim();
    if (orderBys && orderBys.trim() !== '') params.orderBys = orderBys.trim();

    const response = await axiosInstance.get(this.endpoint, { params });
    return response.data;
  }

  async getById(id: string | undefined) {
    const response = await axiosInstance.get(`${this.endpoint}/${id}`);
    return response.data;
  }

  async create(payload: Partial<TCreate> | FormData) {
    const isFormData = payload instanceof FormData;

    const response = await axiosInstance.post(this.endpoint, payload, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });

    return response.data;
  }

  async edit(id: string, payload: Partial<TUpdate> | FormData) {
    const isFormData = payload instanceof FormData;
    const response = await axiosInstance.put(
      `${this.endpoint}/${id}`,
      payload,
      {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      }
    );
    return response.data;
  }

  async delete(id: string | undefined) {
    const response = await axiosInstance.patch(`${this.endpoint}/${id}/status`);
    return response.data;
  }

  async restore(id: string | undefined) {
    const response = await axiosInstance.patch(`${this.endpoint}/${id}/status`);
    return response.data;
  }
}
