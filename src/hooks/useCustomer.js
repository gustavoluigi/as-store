import { useState } from 'react';
import {
  useMutation, useQueries, useQuery, useQueryClient,
} from 'react-query';
import { useNavigate } from 'react-router-dom';
import CustomersService from '../services/CustomersService';
import OrdersService from '../services/OrdersService';
import { triggerToast } from '../utils';

export const useGetCustomer = (customerId, setFields) => {
  const [{ data: customer, ...restCustomer }, { data: orders, ...restOrders }] = useQueries([
    {
      queryKey: ['customer', customerId],
      queryFn: () => CustomersService.getCustomer(customerId),
      onSuccess: (data) => setFields(data),
    },
    {
      queryKey: ['ordersFromCustomer', customerId],
      queryFn: () => OrdersService.listOrdersFromCustomer(customerId),
    },
  ]);

  return {
    customer,
    restCustomer,
    orders,
    restOrders,
    isLoading: restCustomer.isLoading || restOrders.isLoading,
    isError: restCustomer.isError || restOrders.isError,
  };
};

export const useGetCustomers = (debounceSearch) => {
  const {
    data: customers, error, isError, isLoading,
  } = useQuery(['customers', { debounceSearch }], () => CustomersService.listCustomers(debounceSearch));

  return {
    customers, error, isError, isLoading,
  };
};

export const useEditCustomer = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(CustomersService.editCustomer);

  const handleEdit = (fields) => {
    mutation.mutate(fields, {
      onSuccess: (data) => {
        queryClient.setQueryData(['customer', data.id], data);
        triggerToast('success', 'Cliente editado com sucesso');
      },
      onError: (err) => {
        triggerToast('error', err.message);
      },
    });
  };

  return handleEdit;
};

export const useCreateCustomer = (fields) => {
  const navigate = useNavigate();
  const { mutate } = useMutation(CustomersService.createCustomer);

  const handleCreate = () => {
    mutate(fields, {
      onSuccess: (data) => {
        triggerToast('success', 'Cliente criado com sucesso');
        setTimeout(() => {
          navigate(`/clientes/${data.id}`);
        }, 2000);
      },
      onError: (error) => {
        triggerToast('error', error.message);
      },
    });
  };

  return { handleCreate };
};

export const useDeleteCustomer = (customerId) => {
  const navigate = useNavigate();
  const { mutate } = useMutation(CustomersService.deleteCustomer);

  const handleDelete = () => {
    mutate(customerId, {
      onSuccess: () => {
        triggerToast('error', 'Cliente deletado');
        setTimeout(() => {
          navigate('/clientes');
        }, 2000);
      },
    });
  };

  return handleDelete;
};
