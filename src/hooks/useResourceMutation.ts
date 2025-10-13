import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

// TPayload: O formato dos dados que a API espera (ex: { nome_setor_negocio: '...' })
// TResponse: O formato da resposta da API.
// TError: O tipo do erro.
interface MutationVariables<TPayload> {
  payload: TPayload;
  id?: number; 
}

interface UseResourceMutationProps<TPayload, TResponse> {
  // A função da API que será chamada (ex: createBusiness, updateBusiness)
  mutationFn: (vars: { payload: TPayload, id?: number }) => Promise<TResponse>;
  
  // Mensagem de sucesso para o toast
  successToastMessage: string;
  
  // Rota para onde navegar em caso de sucesso
  successNavigationRoute: string;

  // Mensagem para o modal de erro
  errorModalMessage: string;
}

/**
 * Um hook genérico para lidar com mutações de criação e atualização.
 * Gerencia o estado de erro, navegação e toasts de sucesso.
 */
export const useResourceMutation = <TPayload, TResponse = unknown, TError = Error>({
  mutationFn,
  successToastMessage,
  successNavigationRoute,
  errorModalMessage,
}: UseResourceMutationProps<TPayload, TResponse>) => {
  const navigate = useNavigate();
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);

  const mutation = useMutation<TResponse, TError, MutationVariables<TPayload>>({
    mutationFn: (vars) => mutationFn(vars),
    onSuccess: () => {
      navigate(successNavigationRoute, {
        state: { toastMessage: successToastMessage },
      });
    },
    onError: () => {
      setErrorModalVisible(true);
    },
  });

  return {
    ...mutation,
    isErrorModalVisible,
    errorModalMessage,
    closeErrorModal: () => setErrorModalVisible(false),
  };
};
