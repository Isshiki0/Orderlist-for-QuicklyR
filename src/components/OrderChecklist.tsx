import { useState } from 'react';
import { Check, Copy, Plus, Trash2, Edit2, Palette } from 'lucide-react';
import { toast } from 'sonner';

interface OrderItem {
  id: string;
  name: string;
  code: string;
  checked: boolean;
}

type Theme = 'blue' | 'green' | 'purple' | 'orange';

const themes = {
  blue: {
    primary: 'bg-blue-600 hover:bg-blue-700',
    primaryText: 'text-blue-600',
    primaryBorder: 'border-blue-600',
    primaryRing: 'focus:ring-blue-500',
    primaryLight: 'bg-blue-50 border-blue-200',
    checkboxChecked: 'bg-blue-600 border-blue-600',
    checkboxHover: 'hover:border-blue-400',
  },
  green: {
    primary: 'bg-green-600 hover:bg-green-700',
    primaryText: 'text-green-600',
    primaryBorder: 'border-green-600',
    primaryRing: 'focus:ring-green-500',
    primaryLight: 'bg-green-50 border-green-200',
    checkboxChecked: 'bg-green-600 border-green-600',
    checkboxHover: 'hover:border-green-400',
  },
  purple: {
    primary: 'bg-purple-600 hover:bg-purple-700',
    primaryText: 'text-purple-600',
    primaryBorder: 'border-purple-600',
    primaryRing: 'focus:ring-purple-500',
    primaryLight: 'bg-purple-50 border-purple-200',
    checkboxChecked: 'bg-purple-600 border-purple-600',
    checkboxHover: 'hover:border-purple-400',
  },
  orange: {
    primary: 'bg-orange-600 hover:bg-orange-700',
    primaryText: 'text-orange-600',
    primaryBorder: 'border-orange-600',
    primaryRing: 'focus:ring-orange-500',
    primaryLight: 'bg-orange-50 border-orange-200',
    checkboxChecked: 'bg-orange-600 border-orange-600',
    checkboxHover: 'hover:border-orange-400',
  },
};

const defaultItems: OrderItem[] = [
  { id: '1', name: 'Apples', code: 'APL-001', checked: false },
  { id: '2', name: 'Bananas', code: 'BAN-002', checked: false },
  { id: '3', name: 'Oranges', code: 'ORG-003', checked: false },
  { id: '4', name: 'Milk', code: 'MLK-004', checked: false },
  { id: '5', name: 'Bread', code: 'BRD-005', checked: false },
  { id: '6', name: 'Eggs', code: 'EGG-006', checked: false },
];

export function OrderChecklist() {
  const [items, setItems] = useState<OrderItem[]>(defaultItems);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCode, setNewItemCode] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [theme, setTheme] = useState<Theme>('blue');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);

  const currentTheme = themes[theme];

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const addItem = () => {
    if (!newItemName.trim() || !newItemCode.trim()) {
      toast.error('Please enter both item name and code');
      return;
    }

    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      code: newItemCode.trim(),
      checked: false,
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemCode('');
    setIsAddingItem(false);
    toast.success('Item added successfully');
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success('Item deleted');
  };

  const startEdit = (item: OrderItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditCode(item.code);
  };

  const saveEdit = () => {
    if (!editName.trim() || !editCode.trim()) {
      toast.error('Please enter both item name and code');
      return;
    }

    setItems(items.map(item =>
      item.id === editingId
        ? { ...item, name: editName.trim(), code: editCode.trim() }
        : item
    ));
    setEditingId(null);
    setEditName('');
    setEditCode('');
    toast.success('Item updated');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditCode('');
  };

  const generateOrderText = () => {
    const checkedItems = items.filter(item => item.checked);
    if (checkedItems.length === 0) {
      return 'No items selected';
    }

    const formattedDate = new Date(orderDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const orderList = checkedItems.map(item => `${item.name} - ${item.code}`).join('\n');
    return `Order Date: ${formattedDate}\n\n${orderList}`;
  };

  const copyToClipboard = async () => {
    const text = generateOrderText();
    if (text === 'No items selected') {
      toast.error('Please select at least one item');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success('Order list copied to clipboard!');
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const clearSelection = () => {
    setItems(items.map(item => ({ ...item, checked: false })));
    toast.success('Selection cleared');
  };

  const selectedCount = items.filter(item => item.checked).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-gray-900">Weekly Order Checklist</h1>
              <p className="text-gray-600 mt-2">
                Select items to include in your order, then copy the generated text
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Change theme"
              >
                <Palette className="w-5 h-5 text-gray-600" />
              </button>
              {showThemeSelector && (
                <div className="absolute right-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <p className="text-gray-700 mb-2">Choose Theme</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setTheme('blue'); setShowThemeSelector(false); }}
                      className="w-8 h-8 bg-blue-600 rounded hover:opacity-80 transition-opacity"
                      title="Blue"
                    />
                    <button
                      onClick={() => { setTheme('green'); setShowThemeSelector(false); }}
                      className="w-8 h-8 bg-green-600 rounded hover:opacity-80 transition-opacity"
                      title="Green"
                    />
                    <button
                      onClick={() => { setTheme('purple'); setShowThemeSelector(false); }}
                      className="w-8 h-8 bg-purple-600 rounded hover:opacity-80 transition-opacity"
                      title="Purple"
                    />
                    <button
                      onClick={() => { setTheme('orange'); setShowThemeSelector(false); }}
                      className="w-8 h-8 bg-orange-600 rounded hover:opacity-80 transition-opacity"
                      title="Orange"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <label className="text-gray-700">Order Date:</label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${currentTheme.primaryRing}`}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-700">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </div>
            <div className="flex gap-2">
              {selectedCount > 0 && (
                <button
                  onClick={clearSelection}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Selection
                </button>
              )}
              <button
                onClick={() => setIsAddingItem(true)}
                className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 ${currentTheme.primary}`}
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
          </div>

          {isAddingItem && (
            <div className={`mb-4 p-4 border rounded-lg ${currentTheme.primaryLight}`}>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem()}
                  className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${currentTheme.primaryRing}`}
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="Item Code"
                  value={newItemCode}
                  onChange={(e) => setNewItemCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem()}
                  className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${currentTheme.primaryRing}`}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addItem}
                  className={`px-4 py-2 text-white rounded-lg transition-colors ${currentTheme.primary}`}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingItem(false);
                    setNewItemName('');
                    setNewItemCode('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                {editingId === item.id ? (
                  <>
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        className={`px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 ${currentTheme.primaryRing}`}
                        autoFocus
                      />
                      <input
                        type="text"
                        value={editCode}
                        onChange={(e) => setEditCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        className={`px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 ${currentTheme.primaryRing}`}
                      />
                    </div>
                    <button
                      onClick={saveEdit}
                      className={`px-3 py-1 text-white rounded transition-colors ${currentTheme.primary}`}
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        item.checked
                          ? currentTheme.checkboxChecked
                          : `border-gray-300 ${currentTheme.checkboxHover}`
                      }`}
                    >
                      {item.checked && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <div
                      onClick={() => toggleItem(item.id)}
                      className="flex-1 cursor-pointer grid grid-cols-2 gap-4"
                    >
                      <span className={item.checked ? 'text-gray-900' : 'text-gray-700'}>
                        {item.name}
                      </span>
                      <span className="text-gray-500">{item.code}</span>
                    </div>
                    <button
                      onClick={() => startEdit(item)}
                      className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-200 rounded transition-opacity"
                      title="Edit item"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 rounded transition-opacity"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No items in your list. Add some items to get started!
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Generated Order Text:</label>
                <textarea
                  value={generateOrderText()}
                  readOnly
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none"
                />
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className={`mt-4 w-full px-4 py-3 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${currentTheme.primary}`}
            >
              <Copy className="w-5 h-5" />
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
      
      <footer className="mt-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Sultan Abdul Azis. All rights reserved.</p>
      </footer>
    </div>
  );
}
