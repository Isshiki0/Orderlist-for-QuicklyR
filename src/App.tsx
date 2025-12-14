import { useState, useEffect } from 'react';
import { Check, Copy, Plus, Trash2, Edit2, Palette } from 'lucide-react';
import { toast } from 'sonner';


interface OrderItem {
  id: string;
  name: string;
  code: string;
  checked: boolean;
  quantity: number;
  unit: string;
}

type Theme = 'blue' | 'green' | 'purple' | 'orange';

const STORAGE_KEY = 'order-checklist';

const themes = {
  blue: {
    primary: 'bg-blue-600 hover:bg-blue-700',
    primaryText: 'text-blue-600',
    primaryBorder: 'border-blue-600',
    primaryRing: 'focus:ring-blue-500',
    primaryLight: 'bg-blue-50 border-blue-200',
    checkboxChecked: 'bg-blue-600 border-blue-600',
    checkboxHover: 'hover:border-blue-400',
    appBg: 'bg-blue-50',
    cardBg: 'bg-white',
    itemBg: 'bg-blue-50 hover:bg-blue-100',
  },
  green: {
    primary: 'bg-green-600 hover:bg-green-700',
    primaryText: 'text-green-600',
    primaryBorder: 'border-green-600',
    primaryRing: 'focus:ring-green-500',
    primaryLight: 'bg-green-50 border-green-200',
    checkboxChecked: 'bg-green-600 border-green-600',
    checkboxHover: 'hover:border-green-400',
    appBg: 'bg-green-50',
    cardBg: 'bg-white',
    itemBg: 'bg-green-50 hover:bg-green-100',

  },
  purple: {
    primary: 'bg-purple-600 hover:bg-purple-700',
    primaryText: 'text-purple-600',
    primaryBorder: 'border-purple-600',
    primaryRing: 'focus:ring-purple-500',
    primaryLight: 'bg-purple-50 border-purple-200',
    checkboxChecked: 'bg-purple-600 border-purple-600',
    checkboxHover: 'hover:border-purple-400',
    appBg: 'bg-purple-50',
    cardBg: 'bg-white',
    itemBg: 'bg-purple-50 hover:bg-purple-100',

  },
  orange: {
    primary: 'bg-orange-600 hover:bg-orange-700',
    primaryText: 'text-orange-600',
    primaryBorder: 'border-orange-600',
    primaryRing: 'focus:ring-orange-500',
    primaryLight: 'bg-orange-50 border-orange-200',
    checkboxChecked: 'bg-orange-600 border-orange-600',
    checkboxHover: 'hover:border-orange-400',
    appBg: 'bg-orange-50',
    cardBg: 'bg-white',
    itemBg: 'bg-orange-50 hover:bg-orange-100',
  },
};

const defaultItems: OrderItem[] = [
  { id: '1', name: 'PRISTINE GALON', code: '2180001', checked: false, quantity: 1, unit: 'GAL' },
  { id: '2', name: 'UNSWEETENED RED MILK TEA', code: '3311202', checked: false, quantity: 1, unit: 'L' },
  { id: '3', name: 'BITTER JASMINE', code: '3311205', checked: false, quantity: 1, unit: 'L' },
  { id: '4', name: 'CLASSIC THAI MILK TEA', code: '3311208', checked: false, quantity: 1, unit: 'L' },
  { id: '5', name: 'JAVANEGRA COFFEE CONCENTRATE', code: '2230002', checked: false, quantity: 1, unit: 'L' },
  { id: '6', name: 'THAI TEA CONCENTRATE', code: '3231104', checked: false, quantity: 1, unit: 'L' },
  { id: '7', name: 'GREENFIELDS FRESH MILK', code: '2150101', checked: false, quantity: 1, unit: 'PACK' },
  { id: '8', name: 'ICE CUBES', code: '2200001', checked: false, quantity: 1, unit: 'BAG' },
  { id: '9', name: 'STRAWBERRY JAM', code: '1040103', checked: false, quantity: 1, unit: 'BOT' },
  { id: '10', name: 'LOTUS BISCOFF SPREAD', code: '2040001', checked: false, quantity: 1, unit: 'JAR' },
  { id: '11', name: 'DARK CHOCOLATE SAUCE', code: '3040303', checked: false, quantity: 1, unit: 'BOT' },
  { id: '12', name: 'ASSAM CHOCOLATE SAUCE', code: '3040304', checked: false, quantity: 1, unit: 'BOT' },
  { id: '13', name: 'CONDENSED MILK', code: '2160102', checked: false, quantity: 1, unit: 'JAR' },
  { id: '14', name: 'EVAPORATED MILK', code: '2160103', checked: false, quantity: 1, unit: 'JAR' },
  { id: '15', name: 'LARGE STRAW', code: '1070115', checked: false, quantity: 1, unit: 'PACK' },
  { id: '16', name: 'V-660 PLASTIC CUP', code: '1070128', checked: false, quantity: 1, unit: 'PACK' },
  { id: '17', name: 'QR STRAW 1224', code: '1070134', checked: false, quantity: 1, unit: 'PACK' },
  { id: '18', name: 'PLASTIK BENING NO. 28', code: '2070009', checked: false, quantity: 1, unit: 'PACK' },
  { id: '19', name: '4 CUP TRAY', code: '2070015', checked: false, quantity: 1, unit: 'PACK' },
  { id: '20', name: 'PLASTIC CARRIER A1', code: '2070105', checked: false, quantity: 1, unit: 'PACK' },
  { id: '21', name: 'PLASTIC CARRIER A2', code: '2070106', checked: false, quantity: 1, unit: 'PACK' },
  { id: '22', name: 'QR SATIN CUP 500 ML', code: '4070104', checked: false, quantity: 1, unit: 'PACK' },
  { id: '23', name: 'QR SATIN CUP 600 ML', code: '4070105', checked: false, quantity: 1, unit: 'PACK' },
  { id: '24', name: 'QR SWIVEL LID-CLEAR', code: '4070106', checked: false, quantity: 1, unit: 'PACK' },
  { id: '25', name: 'QR LID WITH STRING-WHITE', code: '4070107', checked: false, quantity: 1, unit: 'PACK' },
  { id: '26', name: 'QUICKLY CREAMER', code: '1060023', checked: false, quantity: 1, unit: 'BAG' },
  { id: '27', name: 'TARO POWDER', code: '1060035', checked: false, quantity: 1, unit: 'BAG' },
  { id: '28', name: 'BROWN SUGAR', code: '1060102.1', checked: false, quantity: 1, unit: 'PACK' },
  { id: '29', name: 'COFFEE SLUSH POWDER', code: '1060105', checked: false, quantity: 1, unit: 'PACK' },
  { id: '30', name: 'GULA PASIR', code: '2060106', checked: false, quantity: 1, unit: 'PACK' },
  { id: '31', name: 'MILK PUDDING', code: '3051102', checked: false, quantity: 1, unit: 'CONT' },
  { id: '32', name: 'SILKY CHOCOLATE PUDDING', code: '3051103', checked: false, quantity: 1, unit: 'CONT' },
  { id: '33', name: 'GRASS JELLY', code: '3051105', checked: false, quantity: 1, unit: 'CONT' },
  { id: '34', name: 'CHOCOLATE PUDDING KONTER', code: '3051106', checked: false, quantity: 1, unit: 'CONT' },
  { id: '35', name: 'COFFE JELLY', code: '3051104.1', checked: false, quantity: 1, unit: 'CONT' },
  { id: '36', name: 'KONNYAKU NATURAL', code: '3051101', checked: false, quantity: 1, unit: 'CONT' },
  { id: '37', name: 'COLORFUL JELLY', code: '1050106', checked: false, quantity: 1, unit: 'BOT' },
  { id: '38', name: 'COCONUT PULP ORIGINAL', code: '1050104', checked: false, quantity: 1, unit: 'BOT' },
  { id: '39', name: 'COCONUT PULP LYCHEE SRUP', code: '1050103', checked: false, quantity: 1, unit: 'BOT' },
  { id: '40', name: 'COCONUT PULP GREEN APPLE SYRUP', code: '1050102', checked: false, quantity: 1, unit: 'BOT' },
  { id: '41', name: 'COCONUT PULP GRAPE SYRUP', code: '1050101', checked: false, quantity: 1, unit: 'BOT' },
  { id: '42', name: 'STRAWBERRY MILK PUDDING', code: '3051109', checked: false, quantity: 1, unit: 'CONT' },
  { id: '43', name: 'NATURAL NOODLE JELLY', code: '3051121', checked: false, quantity: 1, unit: 'CONT' },
  { id: '44', name: 'KIWI ALMOND GUODUNG', code: '3360221', checked: false, quantity: 1, unit: 'MJP' },
  { id: '45', name: 'LYCHEE ALMOND GUODUNG', code: '3360215', checked: false, quantity: 1, unit: 'MJP' },
  { id: '46', name: 'STRAWBERRY ALMOND GUODUNG', code: '3360218', checked: false, quantity: 1, unit: 'MJP' },
  { id: '47', name: 'GOELA PANDAN', code: '3361113', checked: false, quantity: 1, unit: 'MJP' },
  { id: '48', name: 'COCOA PANDAN', code: '3361114', checked: false, quantity: 1, unit: 'MJP' },
  { id: '49', name: 'SILKY CHOCOLATE GANACHE MJP', code: '3361117', checked: false, quantity: 1, unit: 'MJP' },
  { id: '50', name: 'GOELA THAI', code: '3361115', checked: false, quantity: 1, unit: 'MJP' },
  { id: '51', name: 'GREEN APPLE ALMOND GUODUNG', code: '3360217', checked: false, quantity: 1, unit: 'MJP' },
  { id: '52', name: 'TARO MILK KONTER', code: '6340202', checked: false, quantity: 1, unit: 'L' },
  { id: '53', name: 'JADMINE MILK TEA KONTER', code: '6340204', checked: false, quantity: 1, unit: 'L' },
  { id: '54', name: 'RED MILK TEA KONTER', code: '6340205', checked: false, quantity: 1, unit: 'L' },
  { id: '55', name: 'COLD BREW GREEN TEA', code: '6340208', checked: false, quantity: 1, unit: 'L' },
  { id: '56', name: 'COLD BREW BLACK TEA', code: '6340209', checked: false, quantity: 1, unit: 'L' },
  { id: '57', name: 'YUANYANG', code: '3141105.1', checked: false, quantity: 1, unit: 'L' },
  { id: '58', name: 'COFFEE LATTE KONTER', code: '3141104', checked: false, quantity: 1, unit: 'L' },
  { id: '59', name: 'KOPI PERANAKAN KONTER', code: '3351304', checked: false, quantity: 1, unit: 'L' },
  { id: '60', name: 'AO-360 CUP', code: '1070107', checked: false, quantity: 1, unit: 'PACK' },
  { id: '61', name: 'AO-520 CUP', code: '1070108', checked: false, quantity: 1, unit: 'PACK' },
  { id: '62', name: 'KOPI PERANAKAN KONTER', code: '3351304', checked: false, quantity: 1, unit: 'L' },
];

export default function App() {
  return <OrderChecklist />;
}


export function OrderChecklist() {
  const [items, setItems] = useState<OrderItem[]>(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved).items ?? defaultItems : defaultItems;
  });
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCode, setNewItemCode] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCode, setEditCode] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [theme, setTheme] = useState<Theme>(savedData.theme || 'blue');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  useEffect(() => {
  const dataToSave = {
    items,
    theme,
    orderDate,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
}, [items, theme, orderDate]);



  const currentTheme = themes[theme];

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const addItem = () => {
    if (!newItemName.trim() || !newItemCode.trim() || !newItemUnit.trim()) {
      toast.error('Please enter item name, code, and unit');
      return;
    }

    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      code: newItemCode.trim(),
      checked: false,
      quantity: 1,
      unit: newItemUnit.trim(),
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemCode('');
    setNewItemUnit('');
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
    setEditUnit(item.unit);
  };

  const saveEdit = () => {
    if (!editName.trim() || !editCode.trim() || !editUnit.trim()) {
      toast.error('Please enter item name, code, and unit');
      return;
    }

    setItems(items.map(item =>
      item.id === editingId
        ? { ...item, name: editName.trim(), code: editCode.trim(), unit: editUnit.trim() }
        : item
    ));
    setEditingId(null);
    setEditName('');
    setEditCode('');
    setEditUnit('');
    toast.success('Item updated');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditCode('');
    setEditUnit('');
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity }
        : item
    ));
  };

  const updateUnit = (id: string, unit: string) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, unit }
        : item
    ));
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

    const orderList = checkedItems.map(item => `${item.name} - ${item.code} (Qty: ${item.quantity} ${item.unit})`).join('\n');
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
    <div className={`min-h-screen ${currentTheme.appBg}`}>
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                My To-Do List
              </h1>
              <p className="text-base md:text-lg text-slate-500">
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
              <div className="grid grid-cols-3 gap-3 mb-3">
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
                <input
                  type="text"
                  placeholder="Unit"
                  value={newItemUnit}
                  onChange={(e) => setNewItemUnit(e.target.value)}
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
                    setNewItemUnit('');
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
                    <div className="flex-1 grid grid-cols-3 gap-3">
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
                      <input
                        type="text"
                        value={editUnit}
                        onChange={(e) => setEditUnit(e.target.value)}
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
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={item.unit}
                        onChange={(e) => updateUnit(item.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="L">L</option>
                        <option value="PACK">PACK</option>
                        <option value="BAG">BAG</option>
                        <option value="GAL">GAL</option>
                        <option value="JAR">JAR</option>
                        <option value="MJP">MJP</option>
                        <option value="CONT">CONT</option>
                        <option value="BOT">BOT</option>
                      </select>
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
    </div>
  );
}