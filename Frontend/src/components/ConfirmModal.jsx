import { RiAlertLine, RiCloseLine } from 'react-icons/ri';

const ConfirmModal = ({
  isOpen,
  title = 'Delete Record?',
  message = 'Are you sure you want to delete this record? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-border-light overflow-hidden transform transition-all duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <RiAlertLine className="text-lg" />
            </div>
            <h3 className="text-base font-extrabold text-text-dark">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="p-1.5 rounded-lg hover:bg-bg-light text-text-muted transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <RiCloseLine className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-text-muted leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-bg-light/40 border-t border-border-light flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 bg-white border border-border-light text-text-dark text-sm font-bold rounded-xl hover:bg-bg-light transition-all cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Deleting...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;
