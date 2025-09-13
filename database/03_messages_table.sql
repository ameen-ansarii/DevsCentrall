-- Messages table for direct messaging
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view messages they sent or received
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

-- Policy: Users can insert messages they send
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Policy: Users can update messages they received (mark as read)
CREATE POLICY "Users can update received messages" ON messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- Index for better performance
CREATE INDEX IF NOT EXISTS messages_sender_receiver_idx ON messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at DESC);
