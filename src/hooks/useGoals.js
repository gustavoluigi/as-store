import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import GoalsService from '../services/GoalsService';
import { capitilize, formatPrice, triggerToast } from '../utils';

export const useGetGoals = (selectedMonth) => {
  const {
    data: goals, error, isError, isLoading,
  } = useQuery(['goals', { selectedMonth }], () => GoalsService.listGoalsAndOrders(selectedMonth), {
    select: ({ goals: goalsList, orders }) => {
      const reducedGoalsList = goalsList.map((goal) => {
        const { month, year } = goal;
        const total = orders.filter((order) => {
          const orderDate = new Date(order.date);
          return orderDate.getMonth() + 1 === month && orderDate.getFullYear() === year;
        }).reduce((acc, order) => acc + order.total, 0);
        return {
          id: goal.id,
          goal: formatPrice(goal.goal),
          total: formatPrice(total),
          date: `${capitilize(new Date(goal.year, goal.month - 1).toLocaleDateString('default', {
            month: 'long',
          }))} de ${goal.year}`,
        };
      });
      return reducedGoalsList;
    },
  });

  return {
    goals, error, isError, isLoading,
  };
};

export const useCreateGoal = (fields) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(GoalsService.createGoal);

  const handleCreate = () => {
    mutate(fields, {
      onSuccess: (data) => {
        queryClient.refetchQueries('goals');
        triggerToast('success', 'Meta criada com sucesso');
        setTimeout(() => {
          // navigate(`/metas/${data[0].id}`);
          navigate(-1);
        }, 2000);
      },

      onError: (error) => {
        triggerToast('error', error.message);
      },

    });
  };

  return { handleCreate };
};
