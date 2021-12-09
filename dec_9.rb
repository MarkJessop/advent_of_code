require 'byebug'

# big_array = [
#   [1, 2, 3, 4],
#   [1, 2, 3, 4],
#   [1, 2, 3, 4],
# ]

# big_array[1][1]  


def input
  File.read($0.gsub(/rb$/,'input'))
end



class SolutionA 
  def initialize(input_path)
    @input = File.read(input_path)
    @heat_map = @input.split(/\n/)
    @heat_map.map! do |row| 
      x = row.split('')
      x.map!{|y| y.to_i}
    end
    @risk = 0
  end

  def solve
    @heat_map.each_with_index do |row, v_index|
      @v_index = v_index
      row.each_with_index do |num, h_index|
        @h_index = h_index

        if (v_index == 0 && h_index == 0)
          #top left
          @risk += (num + 1) if compare(right: right, bottom: bottom, num: num)
        elsif (v_index == @heat_map.size - 1 && h_index == 0 )
          # bottom left
          @risk += (num + 1) if compare(right: right, top: top, num: num)
        elsif (v_index == 0 && h_index ==  row.size - 1 )
          # top right
          @risk += (num + 1) if compare(bottom: bottom, left: left, num: num)
        elsif (v_index == @heat_map.size - 1 && h_index ==  row.size - 1 )
          # bottom right
          @risk += (num + 1) if compare(top: top, left: left, num: num)
        elsif (h_index == 0)
          # left edge
          @risk += (num + 1) if compare(right: right, top: top, bottom: bottom, num: num)
        elsif (h_index == row.size - 1)
          # right edge
          @risk += (num + 1) if compare(left: left, top: top, bottom: bottom, num: num)
        elsif (v_index == 0)
          # top edge
          @risk += (num + 1) if compare(left: left, right: right, bottom: bottom, num: num)
        elsif (v_index == @heat_map.size - 1)
          # bottom edge
          @risk += (num + 1) if compare(left: left, top: top, right: right, num: num)
        else
          @risk += (num + 1) if compare(left: left, top: top, bottom: bottom, right: right, num: num)
        end
      end
    end

    puts @risk
  end

  private

  def right
    @heat_map[@v_index][@h_index + 1]
  rescue
    nil
  end
  def top
    @heat_map[@v_index-1][@h_index]
  rescue
    nil
  end
  def left
    @heat_map[@v_index][@h_index - 1]
  rescue
    nil
  end
  def bottom
    @heat_map[@v_index+1][@h_index]
  rescue
    nil
  end

  def compare (top: 10, bottom: 10, left: 10, right: 10, num:)
    smallest = [left, num, right, top, bottom].min
    num == smallest && ![left, right, top, bottom].include?(num)
  end
end

SolutionA.new('./data/dec_9_input').solve