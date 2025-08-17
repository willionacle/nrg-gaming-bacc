import { createTheme, MantineProvider } from '@mantine/core';
import I18nProvider from './I18nProvider';
import MainWrapper from './MainWrapper';
import { ModalsProvider } from '@mantine/modals';
import { Header } from '@/components';
import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';

const theme = createTheme({
  primaryColor: 'red',
  components: {
    ActionIcon: {
      defaultProps: {
        size: 'lg',
      },
    },
    NumberFormatter: {
      defaultProps: {
        thousandSeparator: true,
      },
    },
    Tooltip: {
      defaultProps: {
        withArrow: true,
      },
    },
    Divider: {
      defaultProps: {
        color: 'dark.4',
      },
    },
    Overlay: {
      defaultProps: {
        backgroundOpacity: 0.5,
      },
    },
    Modal: {
      defaultProps: {
        classNames: {
          content: 'transparent-modal',
        },
      },
    },
  },
});

export default function Provider({
  isLogin = false,
  children,
}: {
  isLogin?: boolean;
  children: React.ReactNode;
}) {
  return (
    <MainWrapper>
      <I18nProvider>
        <MantineProvider theme={theme}>
          <ModalsProvider modalProps={{ withCloseButton: false, centered: true }}>
            {isLogin ? (
              children
            ) : (
              <>
                <Header />
                <Outlet />
              </>
            )}
          </ModalsProvider>
        </MantineProvider>
      </I18nProvider>
      <Toaster position="top-right" richColors closeButton />
    </MainWrapper>
  );
}
